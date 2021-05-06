DECLARE @docId INT = &doctorId;

DECLARE @bCd VARCHAR(2) = &bCd;

DECLARE @roomCd VARCHAR(3) = &roomCd;

DECLARE @res INT;

DELETE FROM
    EXAM_ROOM
WHERE
    Doctor_Assigned = @docId;

EXEC hospital.Add_Exam_Room @Building_Code = @bCd,
@Exam_Room_Code = @roomCd,
@Doctor_Assigned = @docId,
@para_out = @res