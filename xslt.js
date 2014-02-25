(function(document) {

    var xmlEditor = document.getElementById("xml").firstChild,
        xsltEditor = document.getElementById("xslt").firstChild,
        resultEditor = document.getElementById("result").firstChild,
        button = document.getElementsByTagName("button")[0],
        body = document.body || document.getElementsByTagName("body")[0];

    button.addEventListener("click", function() {

        resultEditor.value = "";

        try {

            body.className = "";

            var processor = new XSLTProcessor(),
                xslt = (new DOMParser()).parseFromString(xsltEditor.value, "application/xml"),
                doc = (new DOMParser()).parseFromString(xmlEditor.value, "application/xml");

            processor.importStylesheet(xslt);
            doc = processor.transformToDocument(doc);

            resultEditor.value = new XMLSerializer().serializeToString(doc);

        } catch (e) {
            body.className = "error";
            resultEditor.value = e;
        }

    });

})(document);