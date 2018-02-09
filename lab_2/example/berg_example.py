import arcpy

infile = arcpy.GetParameterAsText(0)
outclass = arcpy.GetParameterAsText(1)

arcpy.AddMessage("Parameters I am seeing:")

arcpy.AddMessage("0: "+infile)
arcpy.AddMessage("1: "+outclass)

arcpy.CopyFeatures_management(infile,outclass)
