class ErrorObj {
    setError (error) {
        this.error = error
        return this
    }
    errorFind (target) {
        return this.error.map(item => ({
            isError: item.isError(target),
            errorMsg: item.errorMsg
        })).find(item => item.isError) || { isError: false }
    }
    errorFindAll (target) {
        return this.error.map(item => ({
            isError: item.isError(target),
            errorMsg: item.errorMsg
        })).filter((item) => item.isError)
    }
    static create (error) {
        return new ErrorObj().setError(error)
    }
}

class ErrorCheck {
    constructor () {
        this.targets = []
        this.addError('title', ErrorObj.create([{
            isError: this.emptyCheck(),
            errorMsg: '제목을 입력하세요'
        }]))
        this.addError('contents', ErrorObj.create([{
            isError: this.emptyCheck(),
            errorMsg: '내용을 입력하세요'
        }]))
        this.addError('userid', ErrorObj.create([{
            isError: this.emptyCheck(),
            errorMsg: '아이디를 입력하세요'
        }, {
            isError: this.lengthCheck(4, 14),
            errorMsg: '아이디는 4~14 자리를 입력해야합니다'
        }]))
        this.addError('password', ErrorObj.create([{
            isError: this.emptyCheck(),
            errorMsg: '패스워드를 입력하세요'
        }, {
            isError: this.lengthCheck(4, 14),
            errorMsg: '패스워드는 4~14 자리를 입력해야합니다'
        }]))
        this.addError('name', ErrorObj.create([{
            isError: this.emptyCheck(),
            errorMsg: '이름을 입력하세요'
        }, {
            isError: this.lengthCheck(2, 14),
            errorMsg: '이름는 2~14 자리를 입력해야합니다'
        }]))
        this.addError('email', ErrorObj.create([{
            isError: this.emptyCheck(),
            errorMsg: '이메일을 입력하세요'
        }, {
            isError: this.emailCheck(),
            errorMsg: '올바른 이메일 형식이 아닙니다.'
        }]))
        this.addError('reply', ErrorObj.create([{
            isError: this.emptyCheck(),
            errorMsg: '댓글을 입력하세요'
        }]))
        this.makeFunction()
    }
    addError (name, error) {
        this.targets.push(name)
        this[name] = error
    }
    firstUpper (text) {
        return text.charAt(0).toUpperCase() + text.substring(1, text.length)
    }
    makeFunction () {
        this.targets.forEach(item => {
            this['check' + this.firstUpper(item)] = (text) => {
                return this[item].errorFind(text)
            }
        })
        this.targets.forEach(item => {
            this['checkAll' + this.firstUpper(item)] = (text) => {
                return this[item].errorFindAll(text)
            }
        })
    }
    emptyCheck () {
        return (text) => !(text && text.length > 0)
    }
    lengthCheck (min, max) {
        return (text) => {
            return text.length < min || text.length > max
        }
    }
    emailCheck () {
        return (text) => {
            const res = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(text)
            return !res
        }
    }
}

export default new ErrorCheck()
