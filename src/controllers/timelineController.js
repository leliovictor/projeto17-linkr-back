import timelineRepository from "../repositories/timelineRepository.js";
import urlMetadata from "url-metadata";

const getPosts = async (req, res) => {
    let postsData = []

    try {
        const { rows: result } = await timelineRepository.getPosts();

        const arrayTemporario = [
            {
                likes: 0,
                message: "Desco",
                pictureUrl: "https://tm.ibxk.com.br/2022/06/07/07130126296199.jpg",
                url: "https://descomplica.com.br/",
                urlInfo: {title: 'Cursinho para Enem, Faculdade e P&#xF3;s Digital | Descomplica', image: 'https://d3awytnmmfk53d.cloudfront.net/landings/static/images/thumb.png', description: 'Cursinho preparatório para o Enem, faculdade digit…, SiSU. Aulas 100% online, certificação pelo MEC.'},
                userId: 1,
                username: "vitor"
            },
            {
                likes: 0,
                message: "video daora aqui gente",
                pictureUrl: "https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2022/08/sandman_reproducao.jpg",
                url: "https://www.youtube.com/watch?v=uMpNAITJ-PY",
                urlInfo: {title: 'O GRANDE PECADO DA NOVA GERAÇÃO: PS5, XBOX SERIES X|S', image: 'https://i.ytimg.com/vi/uMpNAITJ-PY/maxresdefault.jpg', description: 'A cada geração temos erros que são identificados n…ia de ser Melhor e Maior Morrer Apoie o Canal ...'},
                userId: 2,
                username: "joao"
            },
            {
                likes: 0,
                message: "site de anime que eu uso",
                pictureUrl: "https://www.opovo.com.br/_midias/jpg/2021/05/26/750x500/1_the_sandman_01_23_02_2020-15907073.jpg",
                url: "https://animeshouse.net/",
                urlInfo: {title: 'Animes House &#x2013; Animes Online em FHD, HD e SD com os &#xFA;ltimos lan&#xE7;amentos!', image: '', description: 'Animes Online - Dragon Ball, One Piece, Naruto e muito mais'},
                userId: 3,
                username: "rafa"
            }
    ]


        //////////////////////////////////////////////////////////////////////
       /* await Promise.all(
            result.map( async (post) => {
                await urlMetadata (`${post.url}`).then(
                    (metadata) => {
                        const { title, image, description } = metadata
                        postsData.push({...post, urlInfo: {title, image, description}})
                        console.log("dentro", postsData) 
                    },
                    (error) => { console.log(error) }
                )
            })
        );*//*
        ////////////////////////////////////
        const passo1 = () => new Promise(resolver => {


            urlMetadata (`${post.url}`).then(
                (metadata) => {
                    const { title, image, description } = metadata
                    postsData.push({...post, urlInfo: {title, image, description}})
                    console.log("entrou1") 
                },
                (error) => { console.log(error) }
            );
            
        )

        const calc = async n => {
            await passo1()
            console.log("entrou2")
        };

        const passo2 = async () => {
            const unresolvedPromises = result.map(calc);
            const passo3resultado = Promise.all(unresolvedPromises)
            //document.write(passo3resultado)
            console.log("entrou3")
        }
        passo2();
*/

        ///////////////////////////////////TENTATIVA FERNANDO///////////////////////////////////////////////////
        /*
        function resolveCallBack (metadata) {
                const { title, image, description } = metadata
                postsData.push({...post, urlInfo: {title, image, description}})
                console.log("passo1")   
        }
        
        const arrayMap = result.map((post) =>
            new Promise ((resolve, reject) => {
                urlMetadata (`${post.url}`).then((metadata) => {
                    resolve(metadata)
                })
            }  
        )
    ) 
    console.log(arrayMap)

        arrayMap.forEach((a) => a.then(resolveCallBack))
        arrayMap.forEach((a) => a.resolve())


        const abobrinha = Promise.all(
            arrayMap
        )

        console.log("passo2")
*/
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////




        //setTimeout(() => {res.status(200).send(postsData)}, 3000);

        res.status(200).send(arrayTemporario)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};

export { getPosts };