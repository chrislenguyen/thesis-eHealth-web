DECLARE @RC INT;

EXECUTE @RC = hospital.Add_Hospital @Hospital_Name = NhosNameAddHosForm
,
@Location = NhosAddressAddHosForm
SELECT
    @RC