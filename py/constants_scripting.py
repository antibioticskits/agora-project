"""CONSTANTS"""

# BLOCK_LOOKUP_FPATH
block_library_fpath = "data/block_lookup.csv"

block_lookup = pd.DataFrame.from_csv(BLOCK_LOOKUP_FPATH,
                                    header=0, index_col=None)
wells_lookup = pd.DataFrame.from_csv("data/well_table.csv")


"""selected = as lookup table
    block_type	block_name	block_id	block_property1	block_property2
0	initiator	Init1	I1	5	0
"""
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
categories = [{'kind':'initiator', 'symbol':'I'},
              {'kind':'monomer',   'symbol':'M'},
              {'kind':'terminator','symbol':'T'},
             ]
