import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Search() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        navigate(`/user/${data.username}`);
    };

    return (
        <section className='search-box'>
            <div className="search-container">
            <i class="fa-brands fa-github fa-2xl"></i>
            <h1>GitHub Finder</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="text" 
                    placeholder="GitHub Profile" 
                    {...register("username", { required: true })}
                />
                {errors.username && <span>This field is required</span>}
                <button type="submit">Search</button>
            </form>
            </div>
        </section>
    );
}

export default Search;
