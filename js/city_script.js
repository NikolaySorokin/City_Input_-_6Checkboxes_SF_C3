const inputGroup = $(".city-input-group");
const cityInput = $(".city-input");
const inputBtn = $(".input-btn");
const yourCityGroup = $(".your-city-group");
const yourCity = $(".your-city");
const yourCityBtn = $(".your-city-btn");
const delAlert = $(".delete-alert");

const cookieName = "city";
	
$(document).ready(function() {

    if (getCookie(cookieName)) {
    	yourCityGroup.css('display', '');
    	yourCity.text(`Ваш город ${getCookie(cookieName)}`);
    	yourCityBtn.click(function(event) {
    		deleteCookie(cookieName);
    		yourCity.css('display', 'none');
            delAlert.css('display', '');
    	});
    }
    else {
    	inputGroup.css('display', '');
    	inputBtn.click(function(event) {
    		city = cityInput.val();
			setCookie(cookieName, city, {'max-age': 1800});
			cityInput.val('');
    	});

		cityInput.keyup(function(event) {
			if (event.keyCode == 13) {
				inputBtn.click();
				$(this).val('');
			}
		});
    }	
});

// сохраняет куки с указанными именем, значением и опциями(path, max-age...)
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// удаляет куки с указанным name
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
