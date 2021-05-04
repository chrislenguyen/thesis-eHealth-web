DECLARE @RC INT;

EXECUTE @RC = hospital.Add_Department @Hospital_Id = &hosId,
@Dep_Name =  N&departmentName;
SELECT
    @RC