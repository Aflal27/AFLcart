class ApiFeatures{
    constructor(query,queryStr){
        this.query = query
        this.queryStr = queryStr
    }

    search(){
        let keyword = this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        }:{};

        this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryStrCopy = {...this.queryStr}
        // removing feild from query
        const removeFeild = ['keyword','limit','page']
        removeFeild.forEach(feild => delete queryStrCopy[feild]);

        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)

        console.log(queryStr);
        this.query.find(JSON.parse(queryStr));
        return this;


    }

    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage -1)
        this.query.limit(resPerPage).skip(skip)
        return this
    }
}

module.exports = ApiFeatures;