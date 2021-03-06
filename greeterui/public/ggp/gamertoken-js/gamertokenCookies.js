var gamertokenCookies = gamertokenCookies || {
    init:function(custom){
        gamertokenCookies.default.document = window.document;

        if(!custom){
            this.checkCookie();
            return;
        }

        if(custom.backgroundcolor)
            gamertokenCookies.default.backgroundcolor = custom.backgroundcolor;
        if(custom.color)
            gamertokenCookies.default.color = custom.color;
		if(custom.domain=="wallet.gamertoken.com"){
			custom.domain="gamertoken.com";
		}		
        if(custom.domain)
            gamertokenCookies.default.domain = custom.domain;
        if(custom.onCall)
            gamertokenCookies.default.onCall = custom.onCall;
        if(custom.confirmText)
            gamertokenCookies.default.confirmText = custom.confirmText;
        if(custom.text)
            gamertokenCookies.default.text = custom.text;
        if(custom.cookieName)
            gamertokenCookies.default.cookieName = custom.cookieName;
        if(custom.alignment)
            gamertokenCookies.default.alignment = custom.alignment;
        if(custom.conclusive)
            gamertokenCookies.default.conclusive = custom.conclusive;
        if(custom.lang)
            gamertokenCookies.default.lang = custom.lang;
        if(custom.company)
            gamertokenCookies.default.company = custom.company;

        this.checkCookie();
    },
    checkCookie:function () {
        if(gamertokenCookies.default.document.cookie.indexOf(gamertokenCookies.default.cookieName) == -1){
            gamertokenCookies.showOverlay();
        }
        else{
            console.log(gamertokenCookies.onCall);
            if(gamertokenCookies.default.onCall)
                gamertokenCookies.default.onCall();
        }
    },
    showOverlay:function () {
        var alignment = '';
        if(this.default.alignment == 'top')
            alignment = 'top: 95px';
        else if(this.default.alignment == 'bottom')
            alignment = 'bottom: 0px';
        else if(this.default.alignment == 'center')
            alignment = 'top: 40%';
        var notificationBarStyles = 'left: 50%;position: fixed;width: 90%;z-index: 1000;transform: translate(-50%, -50%);background: rgba(17,21,27,0.95);background: -webkit-linear-gradient(rgba(44,49,64,1) 0%,rgba(17,21,27,0.95) 100%);background: -o-linear-gradient(rgba(44,49,64,1) 0%,rgba(17,21,27,0.95) 100%);background: linear-gradient(rgba(44,49,64,1) 60%,rgba(17,21,27,0.95) 100%);padding: 20px;border-radius:  5px;box-shadow: 0 8px 10px 0 rgba(0,0,0,0.2);color: '+this.default.color+';max-width: 700px;'+alignment+';font: 400 12px/1.2 Roboto,sans-serif;';

        if(this.default.alignment == 'center')
        {
            var overlay = document.createElement('div');
            overlay.id = this.default.cookieName+'Center';
            overlay.style.cssText = 'position:absolute; top:0px; left:0px; right:0px; bottom:0px;background:rgba(0,0,0,0.7);z-index:999';
            var overlayFragment = document.createDocumentFragment();
            overlayFragment.appendChild(overlay);
            document.body.appendChild(overlayFragment.cloneNode(true));
        }

        var cookieNotifier = document.createElement('div');
        cookieNotifier.id = this.default.cookieName;
        cookieNotifier.style.cssText = notificationBarStyles;

        if(!this.translation[this.default.lang] || !this.privacy[this.default.company][this.default.lang])
            this.default.lang = 'en';


        var innerHtml = '<div style="width: 100%;height: auto;box-sizing: border-box;"><div style="float: left; width: 80%;">';
        var innerText = this.translation[this.default.lang];
        innerText = innerText.replace('{privacyUrl}', this.privacy[this.default.company][this.default.lang])
        innerHtml += innerText;
        innerHtml += '</div><div id="closeCookieInfo" onclick="gamertokenCookies.acceptOverlay();" style="bobox-sizing: border-box !important;float: right;width: 20%;text-align: center;margin: 10px auto 0px;box-shadow: 1px 1px 4px rgba(0,0,0,0.3);text-decoration: none;border-radius: 20px;padding: 7px 25px;cursor: pointer;padding: 7px 35px;font-size: 18px;background: #01c6db;display: block;cursor: pointer;color: #fff;width: auto;padding: 5px 25px;text-decoration: none;"><a href="#" style="color: #fff;text-decoration: none;font: 700 15px/18px Verdana;display: block;">';
        innerHtml += this.default.confirmText;
        innerHtml += '</a></div></div><div style="clear:both;"></div>';

        cookieNotifier.innerHTML = innerHtml;

        var fragment = document.createDocumentFragment();
        fragment.appendChild(cookieNotifier);
        document.body.appendChild(fragment.cloneNode(true));
    },
    hideOverlay:function () {
        var op = 1;
        var el = document.getElementById(gamertokenCookies.default.cookieName);
        if(this.default.alignment == 'center')
            var elCenter = document.getElementById(gamertokenCookies.default.cookieName+'Center');
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                el.style.display = 'none';
                if(gamertokenCookies.default.alignment == 'center')
                    elCenter.style.display = 'none';
            }
            el.style.opacity = op;
            el.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 10);
    },
    acceptOverlay:function () {
        gamertokenCookies.hideOverlay();
        var date = new Date();
        var days = 2;
        date.setTime(date.getTime()+(days*24*60*60*1000));
        document.cookie = gamertokenCookies.default.cookieName+"=true; expires="+date.toGMTString()+"; path=/; domain="+gamertokenCookies.default.domain;
        if(gamertokenCookies.default.onCall)
            gamertokenCookies.default.onCall();
    }
};

gamertokenCookies.default = {
    backgroundcolor: 'rgba(20, 16, 16, 0.8)',
    color: '#fff',
    confirmText: 'OK',
    denyText: false,
    domain: 'example.com',
    document: false,
    cookieName: 'gamertokenCookies',
    onCall: false,
    alignment: 'top',
    conclusive: false,
    lang: 'en',
    company: 'laurelfoundation',
};

gamertokenCookies.translation = {
    de: "Mit Ihrer weitergehenden Nutzung dieser Website stimmen Sie der Verwendung von Cookies auf Ihrem Ger??t zu. Wenn Sie die Cookie-Einstellungen in Ihrem Browser ??ndern, sind bestimmte Funktionen m??glicherweise nicht mehr verf??gbar. Bitte lesen Sie unsere Datenschutzerkl??rung, um weitere Informationen zu erhalten. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Datenschutzerkl??rung</a>",
    en: "With your continued use of this site you agree to our use of cookies on your device. If you change the cookie settings in your browser certain features might no longer be available. Please read our Privacy Policy for further information. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Privacy Policy</a>",
    fr: "En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies sur votre appareil. Si vous modifiez les param??tres de cookies dans votre navigateur, certaines fonctionnalit??s peuvent ne plus ??tre disponibles. Veuillez lire notre politique de confidentialit?? pour plus d'informations. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Vie priv??e</a>",
    it: "Con l'utilizzo di questo sito accetti il nostro uso dei cookie sul tuo dispositivo. Se modifichi le impostazioni dei cookie nel tuo browser alcune funzionalit?? potrebbero non essere pi?? disponibili. Si prega di leggere la nostra politica sulla privacy per ulteriori informazioni. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Informativa sulla privacy</a>",
    pl: "Kontynuuj??c korzystanie z tej witryny, wyra??asz zgod?? na u??ywanie przez nas plik??w cookie na Twoim urz??dzeniu. Je??li zmienisz ustawienia plik??w cookie w przegl??darce, niekt??re funkcje mog?? by?? niedost??pne. Wi??cej informacji mo??esz znale???? w naszej Polityce prywatno??ci. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Polityka prywatno??ci</a>",
    ru: "?????????????????? ?????????????????????????? ?????? ????????, ???? ???????????????????????? ???? ?????????????????????????? ???????????? cookie. ???? ???????????? ???????????? ????????????, ???????????????? ???????? ???????????????? ?? ?????????????????? ???????????? cookie. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>???????????? ????????????</a>",
    ar: "With your continued use of this site you agree to our use of cookies on your device. If you change the cookie settings in your browser certain features might no longer be available. Please read our Privacy Policy for further information. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Privacy Policy</a>",
    es: "Con el continuo uso de este sitio, aceptas el uso de cookies en tu dispositivo. Si cambias la configuraci??n de las cookies en tu navegador, ciertas caracter??sticas podr??an no estar disponibles. Por favor lee nuestras Pol??ticas de Privacidad para m??s informaci??n. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Privacidad</a>",
    sv: "With your continued use of this site you agree to our use of cookies on your device. If you change the cookie settings in your browser certain features might no longer be available. Please read our Privacy Policy for further information. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Privacy Policy</a>",
    tr: 'Bu siteyi kullanmaya devam etti??inizde, cihaz??n??zda ??erez kullan??m??n?? kabul etmi?? olursunuz. Taray??c??n??z??n ??erez ayarlar??n?? de??i??tirirseniz, baz?? ??zellikler art??k kullan??lamayabilir. Daha fazla bilgi i??in l??tfen Gizlilik Politikam??z?? okuyunuz. <a style=\'border-bottom: 1px dotted #01c6db;color: #01c6db;\' href=\'{privacyUrl}\' target=\'_blank\'>Privacy Policy</a>',
    cs: "With your continued use of this site you agree to our use of cookies on your device. If you change the cookie settings in your browser certain features might no longer be available. Please read our Privacy Policy for further information. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Privacy Policy</a>",
    hr: "Ova stranica koriste kola??i??e za pru??anje boljeg korisni??kog iskustva i funkcionalnosti. Postavke kola??i??a mogu se kontrolirati i konfigurirati u va??em internetskom pregledniku. Nastavkom pregleda internet stranica Ova stranica, smatra se da ste suglasni sa uporabom kola??i??a. Za daljnje informacije pro??itajte na??u Pravila o privatnosti. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Za??tita Podataka</a>",
    bs: "Ova stranica koriste kola??i??e za pru??anje boljeg korisni??kog iskustva i funkcionalnosti. Postavke kola??i??a mogu se kontrolirati i konfigurirati u va??em internetskom pregledniku. Nastavkom pregleda internet stranica Ova stranica, smatra se da ste suglasni sa uporabom kola??i??a. Za daljnje informacije pro??itajte na??u Pravila o privatnosti. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Za??tita Podataka</a>",
    pt: "Com seu uso cont??nuo desse site, voc?? concorda e aceito em usar cookies em seu dispositivo. Caso altere a configura????o de cookies em seu navegador, alguns recursos ficar??o indispon??veis. Favor leia nossa Pol??tica de Privacidade para mais informa????es. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Privacidade dos dados</a>",
    sk: "With your continued use of this site you agree to our use of cookies on your device. If you change the cookie settings in your browser certain features might no longer be available. Please read our Privacy Policy for further information. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Privacy Policy</a>",
    nl: "With your continued use of this site you agree to our use of cookies on your device. If you change the cookie settings in your browser certain features might no longer be available. Please read our Privacy Policy for further information. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'></a>",
    hu: "Ezen webhely folyamatos haszn??lat??val ??n elfogadja a cookie-k haszn??lat??t az eszk??z??n. Ha m??dos??tja a cookie-be??ll??t??sokat a b??ng??sz??ben, bizonyos funkci??k m??r nem ??llnak rendelkez??sre. K??rj??k, olvassa el adatv??delmi szab??lyzatunkat tov??bbi inform??ci??k??rt. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>Titoktart??s</a>",
	cn: "???????????????????????????????????????????????????????????????????????????Cookie??? ??????????????????????????????Cookie?????????????????????????????????????????? ??????????????????????????????????????????????????? <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>????????????</a>",
	jp: "?????????????????????????????????????????????????????????????????????Cookie?????????????????????????????????????????????????????????????????????????????????Cookie???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>??????????????????????????????</a>",
	ko: "??? ???????????? ????????? ????????? ?????? ????????? ????????? ????????? ????????? ???????????? ??? ??????????????? ????????? ???????????????. ??????????????? ?????? ????????? ???????????? ?????? ?????? ???????????? ??? ?????? ???????????? ?????? ??? ????????????. ????????? ????????? ????????? IP ?????? & ?????? ????????? ?????? ??????????????? ????????????. <a style='border-bottom: 1px dotted #01c6db;color: #01c6db;' href='{privacyUrl}' target='_blank'>???????????? ????????????</a>",
};

gamertokenCookies.privacy = {
    laurelfoundation: {
        en: 'https://gamertoken.io/documents/privacypolicy.pdf',
		cn: 'https://gamertoken.io/documents/CN-privacypolicy.pdf',
		jp: 'https://gamertoken.io/documents/JP-privacypolicy.pdf',
		ko: 'https://gamertoken.io/documents/KO-privacypolicy.pdf'
    }
};

$(document).ready(function(){
	   if(gamertokenCookies.default.conclusive && (gamertokenCookies.default.document.cookie.indexOf(gamertokenCookies.default.cookieName) == -1)){
            var links = document.getElementsByTagName("a");
            for(var i=0, max=links.length; i<max; i++) {
                if (links[i].getAttribute('target') != '_blank' && links[i].getAttribute('href') != '#') {
                    links[i].addEventListener('click', gamertokenCookies.acceptOverlay);
                }
            }

            var inputs = document.getElementsByTagName("input");
            for(var i=0, max=inputs.length; i<max; i++) {
                if (inputs[i].getAttribute('type') == 'submit') {
                    inputs[i].addEventListener('click', gamertokenCookies.acceptOverlay);
                }
            }
			
            var buttons = document.getElementsByTagName("button");
            for(var i=0, max=buttons.length; i<max; i++) {
                buttons[i].addEventListener('click', gamertokenCookies.acceptOverlay);
            }
        }
});