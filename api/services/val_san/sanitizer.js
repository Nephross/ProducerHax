//methods for sanitizing user input to avoid bad stuff
//
'use strict';
var Sanitize function(stringValue)
{
    if (null === stringValue) {
        return stringValue;
    } else {
    	return stringValue
                .RegexReplace("-{2,}", "-")                 // transforms multiple --- in - use to comment in sql scripts
                .RegexReplace(@"[*/]+", string.Empty)      // removes / and * used also to comment in sql scripts
                .RegexReplace(@"(;|\s)(exec|execute|select|insert|update|delete|create|alter|drop|rename|truncate|backup|restore)\s", string.Empty, RegexOptions.IgnoreCase);
    }
    
}
 
 
var RegexReplace = function(stringValue, matchPattern, toReplaceWith)
{
    return Regex.Replace(stringValue, matchPattern, toReplaceWith);
};
 
var RegexReplace = function(stringValue, matchPattern, toReplaceWith, regexOptions)
{
    return Regex.Replace(stringValue, matchPattern, toReplaceWith, regexOptions);
}