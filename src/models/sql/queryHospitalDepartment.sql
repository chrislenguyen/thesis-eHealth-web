SELECT
    hos.Hospital_ID as hosId,
    hos.Hospital_Name as hosName,
    DEPARTMENT.Dep_ID as depId,
    DEPARTMENT.Dep_Name as depName
FROM
    HOSPITAL hos
    LEFT JOIN DEPARTMENT as department ON hos.Hospital_ID = DEPARTMENT.Hospital_ID FOR JSON AUTO;