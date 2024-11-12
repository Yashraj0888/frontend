const BASE_URL = 'https://backend-six-mu-25.vercel.app'

export const GetAllEmployees= async (search='',page=1, limit=5)=>{
    const url = `${BASE_URL}/api/employee?search=${search}&page=${page}&limit=${limit}`
    try{
        const options= {
            method:'GET',
            'Content-Type': 'application/json'
        }
        const result= await fetch(url, options)
        const data=await result.json();
        return data;

    }catch(error){
        return error
    }
}

export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/employee`;
    try{
        const formData=new FormData()
        for(const key in empObj){
            formData.append(key,empObj[key])
        }
        const options= {
            method:'POST',
            body: formData
        }
        const result= await fetch(url, options)
        const data=await result.json();
        return data;
    }
    catch(error){
        return error
    }
   
};
export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employee/${id}`;
    console.log('url ', url);
    // Create a FormData object
    const formData = new FormData();

    // Append all fields to the FormData object
    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }
    // FormData handles the headers and content type
    const options = {
        method: 'PUT',
        body: formData
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log('<---update--> ', data);
        return data;
    } catch (err) {
        return err;
    }
};
export const deleteEmployeeById = async ( id) => {
    const url = `${BASE_URL}/api/employee/${id}`;
    console.log('url ', url);
    // Create a FormData object
    

    // Append all fields to the FormData object
    
    // FormData handles the headers and content type
    const options = {
        method: 'DELETE',
     
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log('<---update--> ', data);
        return data;
    } catch (err) {
        return err;
    }
};

export const GetEmployeeDetailsById = async (id) => {
    const url =
        `${BASE_URL}/api/employee/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

