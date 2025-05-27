import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TodoAdd = () => {
    const {
        reset,
        handleSubmit,
        formState: { errors },
        register
    } = useForm()

    const nav = useNavigate();
    const handleSubmitAdd = async (data) => {
        try {
            await axios.post(`http://localhost:3000/todo`, data)
            toast.success("them san pham thanh cong")
            reset()
            nav("/todo")
        } catch (error) {
            console.log("loi ", error);

        }
    }
    return (
        <div>
            <h1>TodoAdd </h1>
            <Link to={"/todo"}>quay lai</Link>
            <form action="" onSubmit={handleSubmit(handleSubmitAdd)}>
                <div>

                    <label htmlFor="">title</label>
                    <input type="text" placeholder='title ...'
                        {...register("title", { required: true, minLength: 5 })} />
                    {errors?.title?.type === "required" && <span>bat buoc nhap</span>}
                    {errors?.title?.type === "minLength" && <span>Bat buoc phai tren 5 ki tu</span>}
                </div>
                <br />

                <div>

                    <label htmlFor="">completed</label>
                    <div>
                        <input type="radio" placeholder='completed ... ' id={'1'} value="true" defaultChecked {...register("completed")}></input>
                        <label htmlFor='1'>Hoan thanh</label>
                    </div>
                    <div>

                        <input type="radio" placeholder='completed ... ' id={'2'} value="false" {...register("completed")} ></input> 
                        <label htmlFor='2'>chua Hoan thanh</label>
                    </div>

                    <br />
                </div>



                <div>

                    <label htmlFor="">priority</label>
                    {/* <input type="text" placeholder='priority ... '
             {...register ("priority", {required: true})} /> {errors?.priority?.type === "required" && <span>bat buoc nhap</span>} */}
                    <select name="priority" id="priority"
                        {...register("priority", { required: true })}>
                        <option value="high">high</option>
                        <option value="medium">medium</option>
                        <option value="low">low</option>

                    </select>
                    {errors?.priority?.type === "required" && <span> bat buoc chon</span>}
                    <br />
                </div>

                <div>

                    <label htmlFor="">description</label>
                    <input type="text" placeholder='description ... '
                        {...register("description", { required: true })} /> {errors?.description?.type === "required" && <span>bat buoc nhap</span>}<br />
                </div>
                <button type='submit'>them san pham</button>
            </form>
        </div>
    )
}


export default TodoAdd