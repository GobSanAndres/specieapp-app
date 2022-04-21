export const encuestas =
    {
        idFormulario: "encuesta1",
        pregunta1: {
            widget_type: "select",
            dataType: "string",
            data: [{ idData: "1", descriptionData: "Select 1" }, { idData: "2", descriptionData: "Select 2" }],
            section: "1",
            description: "Este es un select option",
            required: true
        },
        pregunta2: {
            widget_type: "checkbox",
            dataType: "string",
            data: [{ idData: "1", descriptionData: "Checkbox 1" }, { idData: "2", descriptionData: "Chekbox 2" }],
            section: "1",
            description: "Este es un checkbox",
            required: true
        },
        pregunta3: {
            widget_type: "radiobutton",
            dataType: "string",
            data: [{ idData: "1", descriptionData: "Radio button 1" }, { idData: "2", descriptionData: "Radio button 2" }],
            section: "1",
            description:"Este es un radio button",
            required: true
        },
        pregunta4: {
            widget_type: "input",
            dataType: "number",
            data: [],
            section: "1",
            description:"Este es un input",
            required: true
        },
        pregunta5: {
            widget_type: "input",
            dataType: "text",
            data: [],
            section: "1",
            description:"Este es un input",
            required: true
        },
    };

export const surveys = [
    {
        idFormulario: "actividaddiaria",
        nameSurvey: "Formulario  de actividad diaria",
        sections: [
            {
                idSection: "section1",
                nameSection: "General",
                duplicate: false,
                nameQuestion: null,
                question: [
                    {
                        nameQuestion: "sitio",
                        widget_type: "select",
                        dataType: "string",
                        data: [
                            { idData: "sitio1", descriptionData: "Sitio 1" }, 
                            { idData: "sitio2", descriptionData: "Sitio 2" }, 
                            { idData: "sitio3", descriptionData: "Sitio 3" }
                        ],
                        description: "Sitio",
                        required: true
                    },
                    {
                        nameQuestion: "noupsactivas",
                        widget_type: "select",
                        dataType: "string",
                        data: [
                            { idData: "lineamano", descriptionData: "Línea de mano" }, 
                            { idData: "buceo", descriptionData: "Buceo" }, 
                            { idData: "reel", descriptionData: "Reel" }, 
                            { idData: "nasas", descriptionData: "Nasas" }
                        ],
                        description: "No UEPs Activas",
                        required: true
                    },
                    {
                        nameQuestion: "noupsmuestreadas",
                        widget_type: "select",
                        dataType: "string",
                        data: [
                            { idData: "lineamano", descriptionData: "Línea de mano" }, 
                            { idData: "buceo", descriptionData: "Buceo" }, 
                            { idData: "reel", descriptionData: "Reel" }, 
                            { idData: "nasas", descriptionData: "Nasas" }
                        ],
                        description: "No UEPs Muestreadas",
                        required: true
                    },
                   {
                        nameQuestion: "observaciones",
                        widget_type: "input",
                        dataType: "string",
                        data: [],
                        description:"Observaciones",
                        required: false
                    }
                    
                ]
            }
        ]
    },
    {
        idFormulario: "frecuenciatalla",
        nameSurvey: "Formulario de tallas",
        sections: [
            {
                idSection: "section1",
                nameSection: "General",
                duplicate: false,
                nameQuestion: null,
                question: [
                    {
                        nameQuestion: "sitio",
                        widget_type: "select",
                        dataType: "string",
                        data: [
                            { idData: "sitio1", descriptionData: "Sitio 1" }, 
                            { idData: "sitio2", descriptionData: "Sitio 2" }, 
                            { idData: "sitio3", descriptionData: "Sitio 3" }
                        ],
                        description: "Sitio",
                        required: true
                    },
                    {
                        nameQuestion: "zonapezca",
                        widget_type: "select",
                        dataType: "string",
                        data: [
                            { idData: "zona1", descriptionData: "Zona 1" }, 
                            { idData: "zona2", descriptionData: "Zona 2" }, 
                            { idData: "zona3", descriptionData: "Zona 3" }
                        ],
                        description: "Zona de pesca",
                        required: true
                    },
                    {
                        nameQuestion: "artedepesca",
                        widget_type: "select",
                        dataType: "string",
                        data: [
                            { idData: "lineamano", descriptionData: "Línea de mano" }, 
                            { idData: "buceo", descriptionData: "Buceo" }, 
                            { idData: "reel", descriptionData: "Reel" }, 
                            { idData: "nasas", descriptionData: "Nasas" }
                        ],
                        description: "Arte de pesca",
                        required: true
                    },
                    {
                        nameQuestion: "fechaarribo",
                        widget_type: "date",
                        dataType: "string",
                        data: [],
                        description: "Fecha de arribo",
                        required: true
                    },
                    {
                        nameQuestion: "horasalida",
                        widget_type: "time",
                        dataType: "string",
                        data: [],
                        description:"Hora de salida",
                        required: true
                    },
                    
                    
                ]
            },
            {
                idSection: "section2",
                nameSection: "Información de recursos",
                duplicate: true,
                nameQuestion: "dataSpecies",
                question: [
                    {
                        nameQuestion: "especie",
                        widget_type: "select",
                        dataType: "string",
                        data: [
                            { idData: "especie1", descriptionData: "Especie 1" }, 
                            { idData: "especie2", descriptionData: "Especie 2" }, 
                            { idData: "especie3", descriptionData: "Especie 3" }
                        ],
                        description: "Arte de pesca",
                        required: true
                    },
                    {
                        nameQuestion: "longitud",
                        widget_type: "input",
                        dataType: "string",
                        data: [],
                        description:"Longitud",
                        required: true
                    },
                    {
                        nameQuestion: "frecuencia",
                        widget_type: "input",
                        dataType: "number",
                        data: [],
                        description:"Frecuencia",
                        required: true
                    },
                    {
                        nameQuestion: "sitio",
                        widget_type: "radiobutton",
                        dataType: "string",
                        data: [
                            { idData: "sitio1", descriptionData: "Sitio 1" }, 
                            { idData: "sitio2", descriptionData: "Sitio 2" }, 
                            { idData: "sitio3", descriptionData: "Sitio 3" }
                        ],
                        description: "Sitio",
                        required: true
                    },
                    {
                        nameQuestion: "tipopesqueria",
                        widget_type: "checkbox",
                        dataType: "string",
                        data: [
                            { idData: "caracol", descriptionData: "Caracol" }, 
                            { idData: "langosta", descriptionData: "Langosta" }, 
                            { idData: "pesca", descriptionData: "Pesca" }
                        ],
                        description: "Tipo de pesquería",
                        required: true
                    },
                    {
                        nameQuestion: "firmafuncionario",
                        widget_type: "canva",
                        dataType: "string",
                        data: [],
                        description: "Firma funcionario",
                        required: true
                    },
                    {
                        nameQuestion: "fechaarribo",
                        widget_type: "date",
                        dataType: "string",
                        data: [],
                        description: "Fecha de arribo",
                        required: true
                    },
                    {
                        nameQuestion: "horasalida",
                        widget_type: "time",
                        dataType: "string",
                        data: [],
                        description:"Hora de salida",
                        required: true
                    },
                    
                ]
            }
        ]
    },
    {
        idFormulario: "embarcacion",
        nameSurvey: "Formulario de captura y esfuerzo",
        sections: [
            {
                idSection: "general",
                nameSection: "Información General",
                duplicate: false,
                question: [
                    {
                        nameQuestion: "noregistro",
                        widget_type: "input",
                        dataType: "number",
                        data: [],
                        description: "Número de registro",
                        required: true
                    },
                    {
                        nameQuestion: "tipopesqueria",
                        widget_type: "radiobutton",
                        dataType: "string",
                        data: [
                            { idData: "caracol", descriptionData: "Caracol" }, 
                            { idData: "langosta", descriptionData: "Langosta" }, 
                            { idData: "pesca", descriptionData: "Pesca" }
                        ],
                        description: "Tipo de pesquería",
                        required: true
                    },
                    {
                        nameQuestion: "nombreembarcacion",
                        widget_type: "input",
                        dataType: "string",
                        data: [],
                        description: "Nombre de la embarcación",
                        required: true
                    },
                    {
                        nameQuestion: "nombrecapitan",
                        widget_type: "input",
                        dataType: "string",
                        data: [],
                        description: "Nombre del capitán",
                        required: true
                    },
                    {
                        nameQuestion: "titularpermiso",
                        widget_type: "input",
                        dataType: "string",
                        data: [],
                        description: "Titular del permiso",
                        required: true
                    }
                    
                ]
            },
            {
                idSection: "areadepesca",
                nameSection: "Áreas de pesca",
                duplicate: true,
                nameQuestion: "area",
                question: [
                    {
                        nameQuestion: "area1",
                        widget_type: "input",
                        dataType: "string",
                        data: [],
                        description: "Nombre del área 1",
                        required: true
                    },
                    {
                        nameQuestion: "diasarea1",
                        widget_type: "input",
                        dataType: "number",
                        data: [],
                        description: "No de días del área 1",
                        required: true
                    }
                    
                ]
            },
            {
                idSection: "observaciones",
                nameSection: "Observaciones",
                duplicate: false,
                nameQuestion: null,
                question: [
                    {
                        nameQuestion: "observaciones",
                        widget_type: "input",
                        dataType: "string",
                        data: [],
                        description: "Observaciones",
                        required: true
                    }
                    
                ]
            },
            {
                idSection: "firmas",
                nameSection: "Firmas",
                duplicate: false,
                nameQuestion: null,
                question: [
                    {
                        nameQuestion: "firmafuncionario",
                        widget_type: "canva",
                        dataType: "string",
                        data: [],
                        description: "Firma funcionario",
                        required: true
                    },
                    {
                        nameQuestion: "firmarepresentante",
                        widget_type: "canva",
                        dataType: "string",
                        data: [],
                        description: "Firma Representante o capitán",
                        required: true
                    }
                    
                ]
            }

        ]
    },
] 

export const surveys_1 = [
    {
        idFormulario: "encuesta1",
        nameSurvey: "Formato encuesta 1",
        sections: [
            {
                idSection: "section1",
                nameSection: "Section 1",
                question: [
                    {
                        nameQuestion: "pregunta1",
                        widget_type: "select",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Select 1" }, { idData: "2", descriptionData: "Select 2" }],
                        section: "1",
                        description: "Este es un select option",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta2",
                        widget_type: "checkbox",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Checkbox 1" }, { idData: "2", descriptionData: "Chekbox 2" }],
                        section: "1",
                        description: "Este es un checkbox",
                        required: true
                    },
                   {
                        nameQuestion: "pregunta3",
                        widget_type: "radiobutton",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Radio button 1" }, { idData: "2", descriptionData: "Radio button 2" }],
                        section: "1",
                        description:"Este es un radio button",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta4",
                        widget_type: "input",
                        dataType: "number",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta5",
                        widget_type: "input",
                        dataType: "text",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "preguntacanvas1",
                        widget_type: "canva",
                        dataType: "string",
                        data: [],
                        section: "1",
                        description:"Este es un canva",
                        required: true
                    }
                ]
            },
            {
                idSection: "section2",
                nameSection: "Section 2",
                question: [
                    {
                        nameQuestion: "pregunta6",
                        widget_type: "select",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Select 1" }, { idData: "2", descriptionData: "Select 2" }],
                        section: "1",
                        description: "Este es un select option",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta7",
                        widget_type: "checkbox",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Checkbox 1" }, { idData: "2", descriptionData: "Chekbox 2" }],
                        section: "1",
                        description: "Este es un checkbox",
                        required: true
                    },
                   {
                        nameQuestion: "pregunta8",
                        widget_type: "radiobutton",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Radio button 1" }, { idData: "2", descriptionData: "Radio button 2" }],
                        section: "1",
                        description:"Este es un radio button",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta9",
                        widget_type: "input",
                        dataType: "number",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta10",
                        widget_type: "input",
                        dataType: "text",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "preguntacanvas2",
                        widget_type: "canva",
                        dataType: "string",
                        data: [],
                        section: "2",
                        description:"Este es un canva",
                        required: true
                    }
                ]
            }
        ]
    },
    {
        idFormulario: "encuesta2",
        nameSurvey: "Formato encuesta 2",
        sections: [
            {
                idSection: "section1",
                nameSection: "Section 1",
                question: [
                    {
                        nameQuestion: "pregunta1",
                        widget_type: "select",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Select 1" }, { idData: "2", descriptionData: "Select 2" }],
                        section: "1",
                        description: "Este es un select option",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta2",
                        widget_type: "checkbox",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Checkbox 1" }, { idData: "2", descriptionData: "Chekbox 2" }],
                        section: "1",
                        description: "Este es un checkbox",
                        required: true
                    },
                   {
                        nameQuestion: "pregunta3",
                        widget_type: "radiobutton",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Radio button 1" }, { idData: "2", descriptionData: "Radio button 2" }],
                        section: "1",
                        description:"Este es un radio button",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta4",
                        widget_type: "input",
                        dataType: "number",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta5",
                        widget_type: "input",
                        dataType: "text",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "preguntacanvas1",
                        widget_type: "canva",
                        dataType: "string",
                        data: [],
                        section: "1",
                        description:"Este es un canva",
                        required: true
                    }
                ]
            },
            {
                idSection: "section2",
                nameSection: "Section 2",
                question: [
                    {
                        nameQuestion: "pregunta6",
                        widget_type: "select",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Select 1" }, { idData: "2", descriptionData: "Select 2" }],
                        section: "1",
                        description: "Este es un select option",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta7",
                        widget_type: "checkbox",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Checkbox 1" }, { idData: "2", descriptionData: "Chekbox 2" }],
                        section: "1",
                        description: "Este es un checkbox",
                        required: true
                    },
                   {
                        nameQuestion: "pregunta8",
                        widget_type: "radiobutton",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Radio button 1" }, { idData: "2", descriptionData: "Radio button 2" }],
                        section: "1",
                        description:"Este es un radio button",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta9",
                        widget_type: "input",
                        dataType: "number",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta10",
                        widget_type: "input",
                        dataType: "text",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "preguntacanvas1",
                        widget_type: "canva",
                        dataType: "string",
                        data: [],
                        section: "2",
                        description:"Este es un canva",
                        required: true
                    }
                ]
            }
        ]
    },
    {
        idFormulario: "encuesta3",
        nameSurvey: "Formato encuesta 3",
        sections: [
            {
                idSection: "section1",
                nameSection: "Section 1",
                question: [
                    {
                        nameQuestion: "pregunta1",
                        widget_type: "select",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Select 1" }, { idData: "2", descriptionData: "Select 2" }],
                        section: "1",
                        description: "Este es un select option",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta2",
                        widget_type: "checkbox",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Checkbox 1" }, { idData: "2", descriptionData: "Chekbox 2" }],
                        section: "1",
                        description: "Este es un checkbox",
                        required: true
                    },
                   {
                        nameQuestion: "pregunta3",
                        widget_type: "radiobutton",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Radio button 1" }, { idData: "2", descriptionData: "Radio button 2" }],
                        section: "1",
                        description:"Este es un radio button",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta4",
                        widget_type: "input",
                        dataType: "number",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta5",
                        widget_type: "input",
                        dataType: "text",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "preguntacanvas1",
                        widget_type: "canva",
                        dataType: "string",
                        data: [],
                        section: "1",
                        description:"Este es un canva",
                        required: true
                    }
                ]
            },
            {
                idSection: "section2",
                nameSection: "Section 2",
                question: [
                    {
                        nameQuestion: "pregunta6",
                        widget_type: "select",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Select 1" }, { idData: "2", descriptionData: "Select 2" }],
                        section: "1",
                        description: "Este es un select option",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta7",
                        widget_type: "checkbox",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Checkbox 1" }, { idData: "2", descriptionData: "Chekbox 2" }],
                        section: "1",
                        description: "Este es un checkbox",
                        required: true
                    },
                   {
                        nameQuestion: "pregunta8",
                        widget_type: "radiobutton",
                        dataType: "string",
                        data: [{ idData: "1", descriptionData: "Radio button 1" }, { idData: "2", descriptionData: "Radio button 2" }],
                        section: "1",
                        description:"Este es un radio button",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta9",
                        widget_type: "input",
                        dataType: "number",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "pregunta10",
                        widget_type: "input",
                        dataType: "text",
                        data: [],
                        section: "1",
                        description:"Este es un input",
                        required: true
                    },
                    {
                        nameQuestion: "preguntacanvas2",
                        widget_type: "canva",
                        dataType: "string",
                        data: [],
                        section: "2",
                        description:"Este es un canva",
                        required: true
                    }
                ]
            }
        ]
    },
]