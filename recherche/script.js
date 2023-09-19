var searchData = [];
var searchBox = null;
var searchSpinner = null;
var resultsTable = null;
var timerID = null;

function setSpinning(sp)
{
    searchSpinner.style.visibility = sp ? "visible" : "hidden";
}

function onInputSearchText(e)
{
    var text = e.target.value;
    if (timerID !== null) {
        clearTimeout(timerID);
    }
    timerID = setTimeout(performSearch, 500, text);
    setSpinning(true);
}

function extractSearchTerms(text)
{
    var terms = text.split(" ")
        .filter(function (x) { return x.length > 0; });
    return terms;
}

function performSearch(text)
{
    var terms = extractSearchTerms(text).map(makeSearchBlob);
    //
    var getLineMatches = function(elt, term, callback) {
        for (var i = 0; i < elt.blob.length; ++i) {
            if (elt.blob[i].includes(term)) {
                callback(i);
            }
        }
    };
    //
    var matchingObjects = [];
    if (terms.length > 0) {
        for (var searchIdx = 0; searchIdx < searchData.length; ++searchIdx) {
            var matchingLines = [];
            var matchesAllTerms = true;
            for (var termIdx = 0; termIdx < terms.length && matchesAllTerms; ++termIdx) {
                var oldTotalMatches = matchingLines.length;
                getLineMatches(searchData[searchIdx], terms[termIdx], function(lineIdx) {
                    matchingLines.push([lineIdx]);
                });
                matchesAllTerms = (matchingLines.length - oldTotalMatches) > 0;
            }
            if (matchesAllTerms) {
                matchingObjects.push({
                    "index": searchIdx,
                    "lines": matchingLines,
                });
            }
        }
    }
    //
    clearSearchResultDisplay();
    for (var i = 0; i < matchingObjects.length; ++i) {
        displaySearchResult(matchingObjects[i].index, matchingObjects[i].lines);
    }
    //
    setSpinning(false);
}

function clearSearchResultDisplay()
{
    var table = resultsTable;
    for (var child = table.lastElementChild; child; child = table.lastElementChild) {
        table.removeChild(child);
    }
}

function displaySearchResult(searchIdx, lineIndices)
{
    var searchItem = searchData[searchIdx];
    var table = resultsTable;

    var tr = document.createElement("tr");
    table.appendChild(tr);

    {
        var tdId = document.createElement("td");
        tr.appendChild(tdId);
        var pId = document.createElement("p");
        tdId.appendChild(pId);
        var eltId = document.createElement("span");
        eltId.setAttribute("class", "badge bg-primary");
        eltId.innerText = searchItem.id;
        pId.appendChild(eltId);
        //
        var pCat = document.createElement("p");
        tdId.appendChild(pCat);
        var eltCat = document.createElement("span");
        eltCat.setAttribute("class", "badge bg-success");
        eltCat.innerText = searchItem.category;
        pCat.appendChild(eltCat);
    }

    {
        var td = document.createElement("td");
        tr.appendChild(td);

        var eltAcc = document.createElement("div");
        eltAcc.setAttribute("class", "accordion");
        eltAcc.setAttribute("id", "accordion-" + searchIdx);
        td.appendChild(eltAcc);

        var eltAccItem = document.createElement("div");
        eltAccItem.setAttribute("class", "accordion-item");
        eltAcc.appendChild(eltAccItem);

        var eltAccHdr = document.createElement("h2");
        eltAccHdr.setAttribute("class", "accordion-header");
        eltAccItem.appendChild(eltAccHdr);

        var eltAccHdrBtn = document.createElement("button");
        eltAccHdrBtn.setAttribute("type", "button");
        eltAccHdrBtn.setAttribute("class", "accordion-button");
        eltAccHdrBtn.setAttribute("data-bs-toggle", "collapse");
        eltAccHdrBtn.setAttribute("data-bs-target", "#collapse-" + searchIdx);
        eltAccHdrBtn.setAttribute("aria-expanded", "true");
        eltAccHdrBtn.setAttribute("aria-controls", "collapse-" + searchIdx);
        var eltAccHdrBtnText = document.createElement("span");
        eltAccHdrBtnText.innerText = searchItem.title;
        eltAccHdrBtn.appendChild(eltAccHdrBtnText);
        //eltAccHdrBtn.innerText = searchItem.title;
        eltAccHdr.appendChild(eltAccHdrBtn);

        var eltAccContent = document.createElement("div");
        eltAccContent.setAttribute("class", "accordion-collapse collapse show");
        eltAccContent.setAttribute("data-bs-parent", "#accordion-" + searchIdx);
        eltAccContent.setAttribute("id", "collapse-" + searchIdx);
        eltAccItem.appendChild(eltAccContent);

        var eltLines = document.createElement("ul");
        eltLines.setAttribute("class", "list-group");
        eltAccContent.appendChild(eltLines);
        for (var i = 0; i < lineIndices.length; ++i) {
            if (lineIndices[i] < searchItem.lines.length) {
                var eltLine = document.createElement("li");
                eltLine.setAttribute("class", "list-group-item");
                eltLines.appendChild(eltLine);
                var span = document.createElement("span");
                span.setAttribute("class", "small");
                span.innerText = searchItem.lines[lineIndices[i]];
                eltLine.appendChild(span);
            }
        }
    }
}

function installEventHandlers()
{
    searchBox = document.getElementById("searchBox");
    searchSpinner = document.getElementById("searchSpinner");
    resultsTable = document.getElementById("searchResults");
    searchBox.addEventListener("input", onInputSearchText);
    searchBox.focus();
}

function makeSearchBlob(text)
{
    var result = "";
    for (var index = 0; index < text.length; ++index) {
        var ch = text[index];
        ch = ch.normalize("NFD")[0];
        if (ch == "œ" || ch == "Œ") {
            result += "oe";
        }
        else {
            var cc = ch.charCodeAt(0);
            if ((cc >= 48 && cc < 58) ||
                (cc >= 65 && cc < 91) ||
                (cc >= 97 && cc < 123))
            {
                result += ch;
            }
        }
    }
    result = result.toUpperCase();
    return result;
}

function loadSearchData()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            searchData = JSON.parse(atob(this.responseText));
            for (var i = 0; i < searchData.length; ++i) {
                var elt = searchData[i];
                elt.category = getCategoryOfHymn(elt.id);
                elt.blob = elt.lines.concat([elt.id, elt.category]).map(makeSearchBlob);
                //console.log(elt.id + ": " + elt.category);
            }
            var searchText = searchBox.value;
            if (searchText.length > 0) {
                performSearch(searchText);
            }
            else {
                setSpinning(false);
            }
        }
    };
    xhr.open("GET", "bank.dat", true);
    xhr.send();
}

document.addEventListener("DOMContentLoaded", () => {
    installEventHandlers();
    loadSearchData();
});
