SELECT
    deviceId,
    deviceCd,
    hosName,
    bCd,
    validFlag
FROM
    (
        SELECT
            Device_ID deviceId,
            Device_Code deviceCd,
            Hospital_Name hosName,
            Building_Code bCd,
            Valid_flg validFlag
        FROM
            DEVICE,
            HOSPITAL
        where
            DEVICE.Hospital_ID = HOSPITAL.Hospital_ID
    ) as d FOR JSON AUTO;