import { Actor, Assets, Scenes } from "lunanore";

export class ActorFish extends Actor {
    private _dir: number;
    private _size: number;
    private _speed: number;

    public get dir(): number {
        return this._dir;
    }

    public get size(): number {
        return this._size;
    }

    public get speed(): number { 
        return this._speed;
    }

    constructor() {
        super("fish", Assets.getModel("fish").clone(true));

        this._size = 1 + Math.random() * 10;
        this._dir = Math.random() * 100 > 50 ? 0 : 1;
        this._speed = 5 + Math.random() * 5;

        if (this._dir == 0) {
            this.position.x = -100;
        } else {
            this.position.x = 100;
        }

        this.position.y = -40 + Math.random() * 80;

        this.model.data.scale.set(this._size, this._size, this._size);
    }

    public async update(dt: number) {
        if (this._dir == 0) {
            this.position.x += this._speed * dt;
        } else {
            this.position.x -= this._speed * dt;
        }

        if (this.position.x > 200 && this.dir == 0) {
            Scenes.scene.remove(this);
        }

        if (this.position.x < -200 && this.dir == 1) {
            Scenes.scene.remove(this);
        }
    }
}