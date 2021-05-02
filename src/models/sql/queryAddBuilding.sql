DECLARE @RC INT;

EXECUTE @RC = Add_Building @Hospital_ID = &hosId,
@Building_Code = &bCd;

SELECT
  @RC