class MyPromise {
    constructor(handle) {
        this.status = "pendding";
        this.value = undefined;
        // this.resolveFn = null
        // this.rejectFn = null
        
        // 解决多个then方法的问题
        this.resolveQueue = []; //resolve队列  
        this.rejectQueue = [];//reject队列  

        handle(this._resolve.bind(this), this._reject.bind(this))
    }
    _resolve(val) {
        this.status = "fulfilled"
        this.value = val
        const run = () => {
            //this.resolveFn(val);//调取resolve的时候，执行onResolved回调函数
            let cb;
            
            while (cb = this.resolveQueue.shift()) {
                cb && cb(val)
            }

        }
        let ob = new MutationObserver(run);//手动把run方法改成微任务，优先执行
        ob.observe(document.body, { attributes: true })
        document.body.setAttribute('kkb',Math.random())
        // setTimeout(run);
        
    }
    _reject(val) {
        
        this.status = "rejected"
        this.value = val
        const run = () => {
            // this.rejectFn(val);//调取reject的 时候调取onRejected回调函数
            let cb;
            
            while (cb = this .rejectQueue.shift()) {
                cb && cb(val)
            }
        }
        let ob = new MutationObserver(run)
        ob.observe(document.body, { attributes: true })
        document.body.setAttribute('kkb', Math.random())
        // setTimeout(run);
        
    }
    then(onResolved, onRejected) {
        // console.log(onResolved, onRejected);
        // console.log(onResolved, onRejected);
        /*
            错误写法，这种写法在调用的时候如果是个异步的，则 .then方法无法调用。
            onResolved,onRejected不是在then里面执行的，而是和 resolve reject方法有关
         
        if (this.status == "fulfilled") {
            onResolved && onResolved(this.value)
        } else if (this.status == "rejected") {
            onRejected && onRejected(this.value)
        }
        */
        // 正确写法  把函数保存起来，先不执行，等到调用resolve或者reject的时候再去执行
        // this.resolveFn = onResolved
        // this.rejectFn = onRejected
        // 解决多个then的问题，如果不用数组保存的话，当遇到多个then的时候，后面的会覆盖前面的
        // this.resolveQueue.push(onResolved)
        // this.rejectQueue.push(onRejected)

        // 链式操作
        return new MyPromise((resolve, reject) => {            
            this.resolveQueue.push(val => {
                let res = onResolved && onResolved(val);
                // 如果是对象，则需要判断 res 是不是MyPromise的实例对象
                if (res instanceof MyPromise) {
                    return res.then(res => {
                        resolve(res)
                    })
                }
                resolve(res)
            })

            this.rejectQueue.push(val => {                
                onRejected && onRejected(val);
                reject(val)
            })  
        })
    }
    // 捕获错误 
    catch(onRejected) {
        this.then(undefined, onRejected)
    }

    // static设置静态方法
    static resolve(val) {
        return new MyPromise(resolve => {
            resolve(val)
        })
    }

    static all(lists) {
        let arr = []
        return new MyPromise((resolve, reject) => {
            lists.forEach(item => {                
                item.then(res => {
                    arr.push(res)
                    if (arr.length == lists.length) {
                        resolve(arr)
                    }
                })
            })
        })        
    }

    static race(lists) {
        return new MyPromise((resolve, reject) => {
            lists.forEach(item => {
                item.then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            })
        })
    }

    finally(cb) {
        console.log(cb);
        this.resolveQueue.push(cb)
        this.rejectQueue.push(cb)
        console.log(this.resolveQueue);
        // this.then(cb,cb)
    }
}