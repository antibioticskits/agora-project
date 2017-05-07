"""Sample.py 
Where the meat of the script lives...
"""

import sys
import os



def get_block(choice):
	print "My choice is %s"%choice

	return

input_ver = input if sys.version_info.major == 3 else raw_input

try:
	my_block = input("Which block would you like?: ")
except NameError as e:
	print _
	my_block = raw_input("Which block would you like?: ")


# my_block = input_ver("Which block would you like?: ")
# my_block_type = input_ver("Now what type of block is it?: ")

get_block(my_block)
print "hi there again \n"
# get_block(my_block_type)