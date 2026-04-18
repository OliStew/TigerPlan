import { programsData, equivalencies } from './compareDatabase.js';
 
let selectedProgram1 = null;
let selectedProgram2 = null;
let selectedName1 = '';
let selectedName2 = '';
 
export function showMajors1() {
    const x = document.getElementById("majorDropdown1");
    if (x.style.opacity === "0") {
        x.style.opacity = "1";
        x.style.zIndex = 1;
        x.style.pointerEvents = "auto";
    } else {
        x.style.opacity = "0";
        x.style.pointerEvents = "none";
        x.style.zIndex = 0;
    }
}
 
export function showMajors2() {
    const x = document.getElementById("majorDropdown2");
    if (x.style.opacity === "0") {
        x.style.opacity = "1";
        x.style.zIndex = 1;
        x.style.pointerEvents = "auto";
    } else {
        x.style.opacity = "0";
        x.style.pointerEvents = "none";
        x.style.zIndex = 0;
    }
}
 
export function filterMajors1() {
    const input = document.getElementById("majorInput1");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("majorDropdown1");
    const links = div.getElementsByTagName("a");
 
    for (let i = 0; i < links.length; i++) {
        const txtValue = links[i].textContent || links[i].innerText; 
        links[i].style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
    }
}
 
export function filterMajors2() {
    const input = document.getElementById("majorInput2");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("majorDropdown2");
    const links = div.getElementsByTagName("a");
 
    for (let i = 0; i < links.length; i++) {
        const txtValue = links[i].textContent || links[i].innerText; 
        links[i].style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
    }
}
 
export function majorClicked1(element) {
    const programName = element.textContent.trim();
    selectedProgram1 = programsData[programName];
    selectedName1 = programName;
 
    document.getElementById("majorInput1").placeholder = programName;
    document.getElementById("majorDropdown1").style.opacity = "0";
    document.getElementById("majorDropdown1").style.pointerEvents = "none";
    document.getElementById("majorDropdown1").style.marginTop = "-13%";
    document.getElementById("majorDropdown2").style.marginTop = "-13%";
 
    renderInfoPanel("Infomation1", selectedProgram1);
    checkAndCompare();
}
 
export function majorClicked2(element) {
    const programName = element.textContent.trim();
    selectedProgram2 = programsData[programName];
    selectedName2 = programName;
 
    document.getElementById("majorInput2").placeholder = programName;
    document.getElementById("majorDropdown2").style.opacity = "0";
    document.getElementById("majorDropdown2").style.pointerEvents = "none";
    document.getElementById("majorDropdown2").style.marginTop = "-13%";
    document.getElementById("majorDropdown1").style.marginTop = "-13%";
 
    renderInfoPanel("Infomation2", selectedProgram2);
    checkAndCompare();
}
 

function renderInfoPanel(elementId, programData) {
    const container = document.getElementById(elementId);
    container.style.display = "block";
    container.innerHTML = `
        <div class="infoGroup"><span class="info-label">Type:</span><span class="info-value">${programData.type}</span></div>
        <div class="infoGroup"><span class="info-label">Department:</span><span class="info-value">${programData.department}</span></div>
        <div class="infoGroup"><span class="info-label">Total Credits:</span><span class="info-value">${programData.totalCredits}</span></div>
        <div class="infoGroup"><span class="info-label">Min GPA:</span><span class="info-value">${programData.minGpa}</span></div>
    `;
}
 
function checkAndCompare() {
    if (selectedProgram1 && selectedProgram2) {
        document.getElementById("compareResults").style.display = "block";
        runComparison(selectedProgram1, selectedProgram2, selectedName1, selectedName2);
    }
}
 
function runComparison(prog1, prog2, name1, name2) {
  
    const overlap = prog1.courses.filter(c1 =>
        prog2.courses.some(c2 => c1.code === c2.code)
    );
    const overlapCodes1 = new Set(overlap.map(c => c.code));
    const overlapCodes2 = new Set(overlap.map(c => c.code));
 
   
    const equivPairs = []; 
    const usedInEquiv1 = new Set();
    const usedInEquiv2 = new Set();
 
    for (const rule of equivalencies) {
    
        const c1_A = prog1.courses.find(c => c.code === rule.codeA);
        const c2_B = prog2.courses.find(c => c.code === rule.codeB);
        const c1_B = prog1.courses.find(c => c.code === rule.codeB);
        const c2_A = prog2.courses.find(c => c.code === rule.codeA);
 
        if (c1_A && c2_B && !overlapCodes1.has(c1_A.code) && !overlapCodes2.has(c2_B.code)
            && !usedInEquiv1.has(c1_A.code) && !usedInEquiv2.has(c2_B.code)) {
            equivPairs.push({ course1: c1_A, course2: c2_B, rule });
            usedInEquiv1.add(c1_A.code);
            usedInEquiv2.add(c2_B.code);
        } else if (c1_B && c2_A && !overlapCodes1.has(c1_B.code) && !overlapCodes2.has(c2_A.code)
            && !usedInEquiv1.has(c1_B.code) && !usedInEquiv2.has(c2_A.code)) {
            equivPairs.push({ course1: c1_B, course2: c2_A, rule });
            usedInEquiv1.add(c1_B.code);
            usedInEquiv2.add(c2_A.code);
        }
    }
 

    const allUsed1 = new Set([...overlapCodes1, ...usedInEquiv1]);
    const allUsed2 = new Set([...overlapCodes2, ...usedInEquiv2]);
 
    const unique1 = prog1.courses.filter(c => !allUsed1.has(c.code));
    const unique2 = prog2.courses.filter(c => !allUsed2.has(c.code));
 
   
    const sharedCredits = overlap.reduce((sum, c) => sum + c.credits, 0);
    const equivCredits  = equivPairs.reduce((sum, p) => sum + p.course1.credits, 0);
 

    function taggedList(courses, isProgram1) {
        return courses.map(course => {
            if ((isProgram1 ? overlapCodes1 : overlapCodes2).has(course.code)) {
                return { course, status: 'overlap' };
            }
            const equivMatch = equivPairs.find(p =>
                isProgram1 ? p.course1.code === course.code : p.course2.code === course.code
            );
            if (equivMatch) {
                const other = isProgram1 ? equivMatch.course2 : equivMatch.course1;
                return { course, status: 'equivalent', otherCode: other.code, otherName: other.name };
            }
            return { course, status: 'unique' };
        });
    }
 
    const tagged1 = taggedList(prog1.courses, true);
    const tagged2 = taggedList(prog2.courses, false);
 
  
    const resultsContainer = document.getElementById("compareResults");
    resultsContainer.innerHTML = `
        <div class="summaryResults">
            <p class="summary-p1">
                These programs share <strong>${overlap.length}</strong> identical course(s) 
                (${sharedCredits} credits)${equivPairs.length > 0
                    ? ` and <strong>${equivPairs.length}</strong> course equivalent(s) 
                    (${equivCredits} credits) that may count toward both programs.`
                    : ' that count toward both programs.'}
            </p>
            <div class="detailResults">
                <p class="detail-title">Shared &amp; Equivalent Courses</p>
                <p class="detail-subtext">Courses that are identical or accepted as substitutes between programs</p>
                <div class="legend-gold">● Gold: Overlapping Course</div>
                <div class="legend-purple">● Purple: Course Equivalent / Substitute</div>
                <div class="courseOverlap">
                    ${overlap.map(c => createCourseCardHTML(c, 'overlap')).join('')}
                    ${equivPairs.map(p => createEquivCardHTML(p)).join('')}
                </div>
            </div>
        </div>
 
        <div class="resultContainers">
            <div class="Container1">
                <p class="container-title">${name1}</p>
                <p class="container-subtext">${prog1.courses.length} required courses</p>
                <div class="coursesList">
                    ${tagged1.map(({ course, status, otherCode, otherName }) =>
                        createCourseCardHTML(course, status, otherCode, otherName)
                    ).join('')}
                </div>
            </div>
            <div class="Container2">
                <p class="container-title">${name2}</p>
                <p class="container-subtext">${prog2.courses.length} required courses</p>
                <div class="coursesList">
                    ${tagged2.map(({ course, status, otherCode, otherName }) =>
                        createCourseCardHTML(course, status, otherCode, otherName)
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}
 

function createCourseCardHTML(course, statusClass, equivCode = null, equivName = null) {
    const note = equivCode
        ? `<p class="card-equiv-note">Equivalent to: ${equivCode} – ${equivName}</p>`
        : '';
    return `
        <div class="courseCard ${statusClass}">
            <div class="card-top">
                <span class="card-code">${course.code}</span>
                <span class="card-credits">${course.credits} cr</span>
            </div>
            <p class="card-name">${course.name}</p>
            ${note}
        </div>
    `;
}
 

function createEquivCardHTML({ course1, course2 }) {
    return `
        <div class="courseCard equivalent">
            <div class="card-top">
                <span class="card-code">${course1.code} ↔ ${course2.code}</span>
                <span class="card-credits">${course1.credits} / ${course2.credits} cr</span>
            </div>
            <p class="card-name">${course1.name} ↔ ${course2.name}</p>
            <p class="card-equiv-note">These courses are accepted as substitutes for each other</p>
        </div>
    `;
}
 

window.showMajors1 = showMajors1;
window.showMajors2 = showMajors2;
window.filterMajors1 = filterMajors1;
window.filterMajors2 = filterMajors2;
window.majorClicked1 = majorClicked1;
window.majorClicked2 = majorClicked2;

