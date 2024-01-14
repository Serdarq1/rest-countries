"use strict"

const main = document.querySelector("main")
const select = document.querySelector("select")
const input = document.querySelector("input")
const darkMode = document.querySelector(".dark-toggle")
const selectContainer = document.querySelector(".select-container")
const navText = document.querySelector(".nav-text")

const body = document.body

const africa = document.getElementById("africa")
const asia = document.getElementById("asia")
const europe = document.getElementById("europe")
const oceania = document.getElementById("ocenia")
const america = document.getElementById("america")
const all = document.getElementById("all")
const inputContainer = document.getElementById("input-container")



darkMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
    body.classList.toggle("text-light")
    inputContainer.classList.toggle("input-dark")
    input.classList.toggle("input-dark")
    select.classList.toggle("input-dark")
    selectContainer.classList.toggle("input-dark")
})



fetch("data.json")
    .then(response => response.json())
    .then((values) => {

        let htmlContent = ""

        values.forEach((value) => {
            const countryName = value.name
            const countryPop = value.population.toLocaleString()
            const countryReg = value.region
            const countryCap = value.capital
            const countryImg = value.flag
               
                htmlContent+= `
                
          <div class="country-container" region="${countryReg}">
          <a href="detailed-country.html?code=${value.alpha3Code}" class="country-link">
          <div class="shadow-lg pb-3 vertical-animation">
         
          <div>
              <img src="${countryImg}" width="225px" class="country-img">
          </div>

          <div class="container">

              <div class="fw-bold mb-3 fs-5 mt-2 country-name">${countryName}</div>
              <div>

                  <div class="fw-bold fs-6">Population: <span class="text-secondary fw-normal"> ${countryPop} </span> </div>
                  <div class="fw-bold fs-6">Region: <span class="text-secondary fw-normal"> ${countryReg} </span> </div>
                  <div class="fw-bold fs-6">Capital:  <span class="text-secondary fw-normal"> ${countryCap} </span> </div>

              </div>

          </div>

      </div>
          </a>
          </div>
            `
               
            

         main.innerHTML = htmlContent


         select.addEventListener("change", () => {
            const selectedValue = select.value

            document.querySelectorAll(".country-container").forEach((country) => {
                country.classList.add("d-none")
            })
        
            if(selectedValue !== "all"){
                document.querySelectorAll(`[region = "${selectedValue}"]`).forEach((country) => {
                    country.classList.remove("d-none")
                })
            }if(selectedValue === "Show All"){
                document.querySelectorAll(".country-container").forEach((country) => {
                    country.classList.remove("d-none")
                })
            }
        })
    
        input.addEventListener("keydown", () => {
            const inputValue = input.value.trim().toLowerCase()
            document.querySelectorAll(".country-container").forEach((country) => {
                const countryNameLower = country.querySelector(".country-name").textContent.toLowerCase()
                
                if(countryNameLower.includes(inputValue)){
                    country.classList.remove("d-none")
                }else{
                    country.classList.add("d-none")
                }
            })
        })

    })
})
