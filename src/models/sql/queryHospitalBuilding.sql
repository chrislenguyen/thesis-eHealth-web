SELECT
    hos.Hospital_ID as hosId,
    hos.Hospital_Name as hosName,
    building.Building_Code as bCd
FROM
    HOSPITAL hos
    LEFT JOIN BUILDING building ON hos.Hospital_ID = building.Hospital_ID FOR JSON AUTO;