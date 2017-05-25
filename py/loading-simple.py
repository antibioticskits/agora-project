# coding: utf-8

import numpy as np
from scipy import misc
import pandas as pd
from itertools import combinations, chain

BLOCK_LOOKUP_FPATH = "data/block_lookup.csv"

block_lookup = pd.DataFrame.from_csv(BLOCK_LOOKUP_FPATH,
                                    header=0, index_col=None)
wells_lookup = pd.DataFrame.from_csv("data/well_table.csv")



choices = {
    "initiator":['I1'],
    "monomer":['M1','M3','M4'],
    "terminator":['T1']
}
restrictions = {
    'initiator': 1,
    'monomer': 3,
    'terminator': 1
}
keys = ['initiator', 'monomer', 'terminator']
cat_abbr = {'initiator':'I', 'monomer':'M', 'terminator':'T'}
selected = block_lookup[ block_lookup.block_id.isin(
            np.concatenate(choices.values())
        ) ]

# raw_input("enter here")


def check_input_lengths():

    for btype in restrictions.keys()+choices.keys():
        error_track = "something else"
        try:
            error_track = "requirements dictionary"
            allowed_b = restrictions[btype]
            error_track = "given choices"
            given_b = len(choices[btype])

            if given_b != allowed_b:
                if given_b < 1:
                    print "Didn't get any blocks for %s. Please choose %d blocks."%(btype, allowed_b)
                elif given_b < allowed_b:
                    print "We have only %d blocks for %s. Please choose %d blocks."%(given_b, btype, allowed_b)
                elif given_b > allowed_b:
                    print "%d blocks are too many for %s! Please choose %d blocks."%(given_b, btype, allowed_b)
                return False
        except KeyError as keyerror:
            print "Can't find '%s' in %s."%(btype, error_track)
            return False


    print "We're good on the number of blocks selected!"
    return True
success = check_input_lengths()


def subchain(x):
    vals = choices[x]
    return chain.from_iterable(
        combinations(vals, i) for i in range(1, len(vals)+1))

def define_reactions(inits, monos, terms):
    output = [('','','')]
    for i_set in subchain(inits):   # initiators
        for m_set in subchain(monos):   # monomers
            for t_set in subchain(terms):   # terminators

                output.append( (i_set, m_set, t_set))
    return output

min_btype = 0

def subchain_bin(x, c_min=0, c_max=np.float('inf')):
    """subchain_bin:

    c_min and c_max are inclusive. x is the set to iterate over
    """
    options = len(x)
    c_max = min(c_max, options)
    return chain.from_iterable(
        combinations(range(options), i) for i in range(c_min, c_max+1))

def fill_form(sub, s_form):
    """Helper for define_reactions_bins"""
    s_entry = s_form.copy()
    if len(sub) > 0:
        s_entry[np.array(sub)] = 1
    return s_entry

def define_reactions_bin(keys_ordered, maxes=None):
    # init objects
    output = []
    sets = np.array([np.array(choices[c]) for c in keys_ordered])
    forms = np.array([np.zeros(len(s)) for s in sets])
    i_set, m_set, t_set = sets
    i_form, m_form, t_form = forms
    if maxes == None:
        maxes = (1,len(m_set),1)
    else:
        maxes = [len(s) if m < 1 else m for s,m in zip(sets,maxes)]
    i_max, m_max, t_max = maxes
    i_min = 0
    # could also just iterate through set but for consistency and
    # generalization, i and t options are kept as subchains
    for i_sub in subchain_bin(i_set, i_min, i_max):   # initiators (max 1)
        i_entry = fill_form(i_sub, i_form)
#         this_t_max = t_max if len(i_sub) > 0 else 1
#         this_t_min = min(1, len(i_sub))
        this_t_min, this_t_max = 0,t_max
        for t_sub in subchain_bin(t_set, this_t_min, this_t_max):   # terminators (max 1)
            t_entry = fill_form(t_sub, t_form)
            # 1 if there is/are no initiator and/or terminator, else 0
            this_m_min, this_m_max = (1,1) if min(len(i_sub),len(t_sub))==0 else (0, m_max)
#             this_m_min, this_m_max = 0,m_max
            for m_sub in subchain_bin(m_set, this_m_min, this_m_max):   # monomers
                m_entry = fill_form(m_sub, m_form)
                full_entry = np.array([i_entry, m_entry, t_entry])
                output.append(full_entry)
    output.append(forms.copy())
    output_nparray = np.array(output)
    return output_nparray


# #### RULES
# 1.  may try i, t (no m)
# 2.  may try no i or no t with ONE m.
# 3.  combos of i, m, and t.


# key order, named as indiv vars for clarity
maxes = [2,0,2]
combos_arr = define_reactions_bin(keys, maxes)


# build combos equivalence table (can use to export to db)
columns_index = pd.MultiIndex.from_tuples( [(k,b) for k in keys for b in choices[k]],
                                    names=['category','block_id'])
index_wells = pd.Index(range(0,len(combos_arr)), name='well_id')
combos = pd.DataFrame([np.concatenate(row) for row in combos_arr],
                         columns=columns_index, index=index_wells, dtype=int)


# In[10]:

def write_well_content(row):
    isnull = ""
    values = []
    categories = row.index.levels[0].values
    has_b = 0
    for cat in categories:
#         present = row[cat].where(row[cat]>0).dropna().to_dict().keys()
        non_zero = row[cat].where(row[cat]>0).dropna()
        present = non_zero.reset_index()['block_id'].values
        # ORDERING -- can be changed
        present = sorted(present)
        text = ", ".join(present) if len(present) > 0 else isnull
        has_b += min(1,len(present))
        values.append(text)
    output = pd.Series(values, index=categories)
    return output

# last well is neg control
wells = combos.apply(write_well_content, axis=1).reset_index(drop=True)


# In[ ]:

drop_samples = [1,2,4,5,7,8]
wells_mod = wells.drop(drop_samples)
wells_mod.reset_index(inplace=True, drop=True)


# In[11]:

wells_mod['sample'] = range(1, len(wells_mod)+1)
# assign wells (this is auto)
wells_mod['well_id'] = range(len(wells_mod))
wells_mod['well_name'] = wells_mod.well_id.apply(lambda x: wells_lookup.loc[x,'well_name'])
wells_mod.set_index('well_id',inplace=True)




wells_mod.to_json('wells_listed-idx-well_id.json', orient='index')

"""
# # OTHER THINGS
class MismatchError(Exception):
    ERROR_TYPE = ["too few blocks", "too many blocks", "other error"]
    def __init__(self, e, cat, require, given):
        # what value is given
#         error_lookup
        self.error = e
        self.cat = cat
        self.require = require
        self.given = given

    def __str__(self):
        # returns error message
        msg = "Oops! Here's what went wrong with %s: %s."%(self.cat, self.ERROR_TYPE[self.error])
        return repr(msg)

def check_b(a,b, btype, e):
    if a!=b:
        print "oops"
        return MismatchError(e,btype,a,b)

def check_input_lengths():
    for btype in restrictions.keys()+choices.keys():
        error_track = "Something's wrong with the block names."
        try:
            error_track = "requirements dictionary"
            allowed_b = restrictions[btype]
            error_track = "given choices"
            given_b = len(choices[btype])



            check_b(given_b, allowed_b, btype, 0)
            print given_b, allowed_b, btype
#             if given_b != allowed_b:
#                 check_b
#                 MismatchError(0, btype, allowed_b, given_b)

        except KeyError as keyerror:
            print "Can't find '%s' in %s."%(btype, error_track)
            return False
        except MismatchError as e:
            print e.message
            return False

    print "We're good on the number of blocks selected!"
    return True
"""
