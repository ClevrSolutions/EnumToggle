Set widget="EnumToggle"
del .\dist\%widget%.mpk /Q
"C:\Program Files\7-Zip\7za"  a -r -tzip .\dist\%widget%.mpk .\src\*
del .\test\widgets\%widget%.mpk /Q
copy .\dist\%widget%.mpk .\test\widgets\%widget%.mpk 
pause
