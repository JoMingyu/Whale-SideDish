export class Meal{
    private static _instance: Meal;
    private currentSchool: any;
    public meals: any[] = [];
    public static isMain: boolean = false;

    static singleton(){
        if(this._instance == null){
            this._instance = new Meal();
        }

        return this._instance;
    }

    saveSchool(currentSchool: any){
        this.currentSchool = currentSchool;
        localStorage.setItem('code', currentSchool.code);
    }
}