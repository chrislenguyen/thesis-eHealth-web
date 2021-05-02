DECLARE @RC INT;

EXECUTE @RC = hospital.Add_Hospital @Hospital_Name = N&hosNameAddHosForm
,
@Location = N&hosAddressAddHosForm
SELECT
    @RC