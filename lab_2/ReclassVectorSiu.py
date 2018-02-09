
# coding: utf-8

# In[5]:


# import arcpy package
import arcpy


# In[6]:


# Input parameters from the client.

# desired feature layer to reclassify
orig_shapefile = arcpy.GetParameterAsText(0)

# desired field in file to reclassify
inField = arcpy.GetParameterAsText(1)

# desired outfield name
outField = arcpy.GetParameterAsText(2)

# table to reclass shapefile
reclassTable = arcpy.GetParameterAsText(3)

# client's default value for inField values outside the range of reclass table
notFoundValue = arcpy.GetParameterAsText(4)

# path to output feature class
outClass = arcpy.GetParameterAsText(5)


# In[3]:


# create output shapefile from input shapefile
arcpy.CopyFeatures_management(orig_shapefile, outClass)


# In[4]:


# add 'outfield' attribute to the output shapefile
arcpy.AddField_management(outClass, outField, "DOUBLE")


# In[9]:


# search cursor to search the input shapefile
inFileSearch = arcpy.da.SearchCursor(orig_shapefile, inField)

# move search cursor to first row
reclassSearch = arcpy.da.SearchCursor(reclassTable, ["lowerbound", "upperbound", "value"])

# update cursor to update the 'outfield' in the output shapefile with
# either values from the reclass table or notFoundValue from client
outUpdate = arcpy.da.UpdateCursor(outClass, outField)

# Searche each value of the inField from input shapefile and finds first occurence
# where the inField value is within range of the lower and upper bound values from 
# the reclass table. This test is inclusive of upper and lower values. If the inField 
# value is within the range, the reclass value from the reclass table is assigned
# to the tuple's 'outfield' attribute, else the notFoundValue is assigned.
for rowUpdate in outUpdate:
    inFileSearch.next() # move search cursor to next row in input shapefile
    reclassResult = notFoundValue # default to notFoundValue
    
    # compares values in the lowerBoundVal and upperBoundVal list to find the
    # first occurence where the inField value is within their range.
    for reclassRow in reclassSearch:
        if((inFileSearch[0] >= reclassRow[0]) & (inFileSearch[0] <= reclassRow[1])):
            reclassResult = reclassRow[2] # reassign reclassResult to reclass value
            break # first occurence found, exit nested loop
    del reclassRow
    rowUpdate[0] = reclassResult # set outfield to reclass value
    outUpdate.updateRow(rowUpdate) # update tuple with reclassified value or notFoundValue
    reclassSearch.reset() # reset reclass search cursor

# delete row objects to remove locks
del rowUpdate

# delete search and update cursors to remove locks
del inFileSearch
del outUpdate
del reclassSearch

