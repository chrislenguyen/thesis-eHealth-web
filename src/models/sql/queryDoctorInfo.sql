SELECT
    docId,
    fname,
    lname,
    hosId,
    hosName,
    bCode,
    exRoomCode
FROM
    (
        SELECT
            doctor.Doctor_ID docId,
            doctor.First_Name fname,
            doctor.Last_Name lname,
            hospital.Hospital_ID hosId,
            hospital.Hospital_Name hosName,
            exRoom.Building_Code bCode,
            exRoom.Exam_Room_Code exRoomCode
        FROM
            DOCTOR doctor
            INNER JOIN EXAM_ROOM exRoom ON doctor.Doctor_ID = exRoom.Doctor_Assigned
            INNER JOIN HOSPITAL hospital ON exRoom.Hospital_ID = hospital.Hospital_ID
        WHERE
            doctor.User_Name = &username
    ) as doctorInfo FOR JSON AUTO;