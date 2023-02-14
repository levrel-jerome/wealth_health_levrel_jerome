function filterTab(employees, letter) {

    let employesFilter = [...employees];

    let letterLowerCase = letter.toLowerCase();

    if(employesFilter.some((employe) => 
    employe.toLowerCase().includes(letterLowerCase)
    ))
    {
      employesFilter = employesFilter.filter((employe) =>
      employe.toLowerCase().includes(letterLowerCase));
      return employesFilter;
    } else {
      console.log("oups");
    }

  }