

export const saludar = async(req, res) => {


    return res.status(200).send({
        saludo: "Saludo desde el controlador de inicio"
    });

}


export default {saludar}

