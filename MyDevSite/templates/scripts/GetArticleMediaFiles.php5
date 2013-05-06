define("OK", 1);
date_default_timezone_set($SOSE->GetVar('timezone'));
$SiteDebug = $SOSE->GetVar("@SiteDebug");
$ForReading = 1;
$adCmdText = 1;
$adCmdStoredProc = 4;
$adTypeBinary = 1;
$adParamInput = 1;
$adParamLong = 128;
$adInteger = 3;
$adSmallint = 2;
$adTinyint = 16;
$adVarchar = 200;
$adDate = 7;
$adBinary = 128;
$adLongVarBinary = 205;
$adLongVarChar = 201;
$adDBTimeStamp = 135;
try {
    $StorySite = $SOSE->GetVar("StorySite");
    $StoryDate = $SOSE->GetVar("StoryDate");
    $StoryCategory = $SOSE->GetVar("StoryCategory");
    $StoryID = $SOSE->GetVar("StoryID");
    if ($StoryID == "")
        $StoryID = -1;
    $IncludeMediaFileTypes = $SOSE->GetVar("IncludeMediaFileTypes");
    $ExcludeMediaFileTypes = $SOSE->GetVar("ExcludeMediaFileTypes");
    $AssetCount = $SOSE->GetVar("AssetCount");
    if ($AssetCount == "")
        $AssetCount = 0;
    $MediaCount = $SOSE->GetVar("MediaCount");
    if ($MediaCount == "")
        $MediaCount = 1;
    $SortOrder = $SOSE->GetVar("SortOrder");
    if ($SortOrder == "")
        $SortOrder = 0;
    $Test = $SOSE->GetVar("Test");
    if ($Test == "")
        $Test = 0;
    $ObjectName = $SOSE->GetVar("ObjectName");
    if ($ObjectName == "")
        $ObjectName = "ArticleMediaFileEmbed";
    $ObjectClassNumber = $SOSE->GetVar("ObjectClassNumber");
    $sql = "exec custom.dbo.GetArticleMediaFiles @StorySite = '".$StorySite."', @StoryDate = '".$StoryDate."', @StoryCategory = '".$StoryCategory."', @StoryID = ".$StoryID.", @IncludeMediaFileTypes = '".$IncludeMediaFileTypes."', @ExcludeMediaFileTypes = '".$ExcludeMediaFileTypes."', @AssetCount = ".$AssetCount.", @SortOrder = ".$SortOrder.", @Test = ".$Test.", @MediaCount = '".$MediaCount."';";
    //$SOSE->Echo('Query is '.$sql);
    $rows = 0;
    $res = $SOSE->ROServerConnection->execute($sql, $rows, 1);
    if (($res) && ($res->State == OK)) {
    	$tplWrapper = $SOSE->LocateObject($ObjectName.$ObjectClassNumber);
    	$tplDefault = $SOSE->LocateObject($ObjectName."Item".$ObjectClassNumber);
        $items = "";
    	if (!$res->eof) {
    		while (!$res->eof) {
                $SOSE->CLEARVARLIST();
    			for ($x = 0; $x < $res->fields->Count; $x++) {
    				if (($res->fields[$x]->value != "") && ($res->fields[$x]->type == $adDBTimeStamp)) {
    					$SOSE->SetVar($res->fields[$x]->name, $SOSE->FormatDateTime("yyyymmddhhmmss", $res->fields[$x]->value));
    				} elseif ($res->fields[$x]->value != "") {
    					$SOSE->SetVar($res->fields[$x]->name, $res->fields[$x]->value);
                        if ($res->fields[$x]->name == "Extension"){
                            $tpl1 = $SOSE->LocateObject($ObjectName."Item".$res->fields[$x]->value.$ObjectClassNumber);
                        }
                    }
                }
                if (stripos($tpl1, "ERROR:") === false)
                    $items .= $SOSE->PBOScript($tpl1);
                else
                    $items .= $SOSE->PBOScript($tplDefault);
                $res->MoveNext();
            }
        }
        $SOSE->SetVar("Items", $items);
        $SOSE->Echo($SOSE->PBOScript($tplWrapper));
    }else{
		$SOSE->Echo('Error Found while connecting with server');	
	}
} catch (Exception $e){
    $SOSE->Echo('<!-- Caught exception: '.$e->getMessage()."\nSQL: ".$sql." -->");
} 
