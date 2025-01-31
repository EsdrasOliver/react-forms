// REACT HOOK FORM
// rodou os comandos para instalar
//    react hook form
//    validator para validar o campo de senha 

import { useForm } from "react-hook-form"; // hook do React Hook Form
import { isEmail } from "validator";

const GoodForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }, // informa o erro 
  } = useForm();
  // register é para registrar os dados informados pelo usuario

  const watchPassword = watch("password"); // para monitorar o input com essa classe | ele renderiza cada vez q o usuario digita

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  console.log("RENDER");

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Name</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Your name"
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && (
          <p className="error-message">Name is required.</p>
        )} {{ /* Aparece a mgs de erro */ }}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Your e-mail"
          {...register("email", {
            required: true,
            validate: (value) => isEmail(value),
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="error-message">Email is required.</p>
        )}

        {errors?.email?.type === "validate" && (
          <p className="error-message">Email is invalid.</p>
        )}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 7 })}
        /> {{ /* a senha precisa ter 7 caracteres */ }}

        {errors?.password?.type === "required" && (
          <p className="error-message">Password is required.</p>
        )}

        {errors?.password?.type === "minLength" && (
          <p className="error-message">
            Password needs to have at least 7 characters.
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Password confirmation</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Repeat your password"
          {...register("passwordConfirmation", {
            required: true,
            validate: (value) => value === watchPassword,
          })}
        />
        {errors?.passwordConfirmation?.type === "required" && (
          <p className="error-message">Password confirmation is required.</p>
        )}

        {errors?.passwordConfirmation?.type === "validate" && (
          <p className="error-message">Passwords does not match.</p>
        )}
      </div>
      <div className="form-group">
        <label>Profession</label>
        <select
          className={errors?.profession && "input-error"}
          defaultValue="0"
          {...register("profession", { validate: (value) => value !== "0" })}
        >
          <option value="0">Select your profession...</option>
          <option value="developer">Developer</option>
          <option value="other">Other</option>
        </select>

        {errors?.profession?.type === "validate" && (
          <p className="error-message">Profession is required.</p>
        )}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register("privacyTerms", {
              validate: (value) => value === true,
            })}
          />
          <label>I agree with the privacy terms.</label>
        </div>

        {errors?.privacyTerms?.type === "validate" && (
          <p className="error-message">
            You must agree with the privacy terms.
          </p>
        )}
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default GoodForm;
