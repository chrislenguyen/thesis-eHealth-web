SELECT
    Doctor_ID docId,
    Building_Code bCd,
    Exam_Room_Code roomCd,
    First_Name fname,
    Last_Name lname
FROM
    (
        SELECT
            Doctor_ID,
            Building_Code,
            Exam_Room_Code,
            Last_Name,
            First_Name
        FROM
            DOCTOR
            LEFT JOIN EXAM_ROOM ON DOCTOR.Doctor_ID = EXAM_ROOM.Doctor_Assigned
        WHERE
            DOCTOR.Hospital_ID = &hosId
            AND DOCTOR.Dep_ID = &depId
    ) as dr FOR JSON AUTO;