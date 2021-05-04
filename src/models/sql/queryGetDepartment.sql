SELECT
    department.Dep_ID departmentId,
    department.Dep_Name departmentName
FROM
    DEPARTMENT department
    INNER JOIN HOSPITAL hospital ON department.Hospital_ID = hospital.Hospital_ID
WHERE
    department.Hospital_ID = &hosId FOR JSON AUTO;