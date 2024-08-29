export class UnabelToSaveUserError extends Error {
    constructor(message: string){
        super(message)
    }

}

export class InvalidUsernameOrPwd extends Error {
    constructor(message: string){
        super(message)
    }
}