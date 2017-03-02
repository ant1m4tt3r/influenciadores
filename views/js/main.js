$(document).ready(function () {

    $("#search0").submit(function (event) {
        var selecionado = $("#selector option:selected").text();
        $('input[name="socialInput0"]').val(selecionado);
        return true;
    });

    $("#search1").submit(function (event) {
        var selecionado = $("#selector option:selected").text();
        $('input[name="socialInput1"]').val(selecionado);
        return true;
    });

});
