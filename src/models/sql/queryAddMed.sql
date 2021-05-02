DECLARE @MED AS MED_TYPE
INSERT INTO
    @MED
VALUES
    &data;

EXEC hospital.Add_Medication @MED