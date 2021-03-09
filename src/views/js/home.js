// $('#btnOpenAddMedModal').on('click', function () {
//     console.log('Add Med Click');

// });

$('#btnCancelMedModal').on('click', function () {
    $('#myModal').modal('hide')
});

$('#medModal').on('hidden.bs.modal', function() {
    $(':input', this).val('');
    console.log('HIDED');
  });