export class Meal{
    private static _instance: Meal;
    public meals: any[] = [];

    static singleton(){
        if(this._instance == null){
            this._instance = new Meal();
        }

        return this._instance;
    }
}