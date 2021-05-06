SELECT
    DISTINCT BUILDING.Building_Code bCd,
    exRoom.Room_Code roomCd,
    EXAM_ROOM.Doctor_Assigned
FROM
    ROOM as exRoom
    INNER JOIN BUILDING ON BUILDING.Building_Code = exRoom.Building_Code
    LEFT JOIN EXAM_ROOM ON exRoom.Room_Code = EXAM_ROOM.Exam_Room_Code
    AND exRoom.Building_Code = EXAM_ROOM.Building_Code
    AND exRoom.Hospital_ID = EXAM_ROOM.Hospital_ID
WHERE
    exRoom.Hospital_ID = &hosId
    AND EXAM_ROOM.Doctor_Assigned IS NULL FOR JSON AUTO;