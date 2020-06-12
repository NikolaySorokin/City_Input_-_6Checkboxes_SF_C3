const saveChk = $(".save-chk");
const chkList = $.find(".form-check-input");

$(document).ready(function() {
	
	if (localStorage.getItem("checked")) {
		// читаем отмеченные чекбоксы в localstorage  в виде объекта
		checkedBoxes = JSON.parse(localStorage.getItem("checked"));
		for(let i = 0; i < checkedBoxes.length; i++){
			$(`#${checkedBoxes[i]}`).prop("checked", true);
		}
		makeChkDisabled(chkList);
	}
	
	saveChk.click(function(event) {
		valueArr = saveChkToArr(chkList);
		if (valueArr.length > 0) {
			localStorage.setItem("checked", JSON.stringify(valueArr));
		}
		else {
			localStorage.removeItem("checked");
		}
		
	});
});

// сохраняет id отмеченных чекбоксов в массив
function saveChkToArr(chkList) {
	valArr = [];
    for(let i = 1; i <= chkList.length; i++){
		if ($(`#check${i}`).is(":checked")) {
			valArr.push(chkList[i-1].id);
		}
	}
	return valArr
}

// делает все чекбоксы disabled
function makeChkDisabled(chkList){
	for(let i = 1; i <= chkList.length; i++){
		$(`#check${i}`).prop("disabled", true);
	}
}
