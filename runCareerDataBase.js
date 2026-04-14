
import * as allData from './careerSearchDataBase.js';
const postContainer = document.querySelector(".careerContent");

export const postMethods = (dataArray) => {

    postContainer.innerHTML = ""; 

    dataArray.map((postData) => {
        const postElement = document.createElement('div');
        postElement.classList.add("card");
        postElement.innerHTML = ` 
            <p class="job-name"> <i class="material-icons suitCase"
            style="font-size:23px; color: #461D7C;">business_center</i> ${postData.jobName}</p>
            <p class="job-details">${postData.jobDetails}</p>
            <p class="job-pay"> <i class="material-icons dollarSign"
            style="font-size:15px; color: #808080;">attach_money</i>${postData.jobPay}</p>
            <p id="p1">Required Skills:</p>
            <p class="job-skills">Skills SKills</p>    
        `
        postContainer.appendChild(postElement)
    })
}


