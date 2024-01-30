function getModelID() {
    let userAgent = navigator.userAgent || navigator.vendor;

    if (/SM-G950|SM-G955|SM-G960|SM-G965|SM-G998|SM-G996|SM-G991|SM-N985|SM-N986|SM-N980|SM-N981|SM-G988|SM-G985|SM-G986|SM-G980|SM-G981|SM-N976|SM-N975|SM-N970|SM-G977|SM-G975|SM-G970|SM-G973|SM-N960|SM-N965|SM-N950|SM-N930|SM-G935|SM-G930|SM-A146|SM-S911|SM-S916|SM-S918|SM-F936|SM-F721|SM-A536|SM-A736|SM-M536|SM-S901|SM-S906|SM-S908|SM-M526|SM-F711|SM-F926|SM-F916|SM-F700|SM-F707|SM-F900|SM-A908/i.test(userAgent)) {
        return "true";
    }
    return "false";
}

export default getModelID;