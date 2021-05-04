SELECT
    room.Room_Code roomCd
FROM
    ROOM room
WHERE
    room.Building_Code = &bCd
    AND room.Hospital_ID = &hosId FOR JSON AUTO;