import FormInput from "../components/FormInput"
import { SubTitle, Title } from "../components/Typography"

const Login = () => {
    return (
        <div className="flex flex-col gap-6 px-4 pt-15">
            <div className="flex flex-row items-center gap-1">
                <div className="w-5 aspect-square bg-amber-600"></div>
                <Title>BXpense</Title>
            </div>
            <div className="flex flex-col gap-1">
                <Title>你好! </Title>
                <Title>準備開始記錄？</Title>
                <SubTitle>登入您的帳號以使用.</SubTitle>
            </div>

            <form className="flex flex-col gap-2 w-full px-4" >
                <FormInput label="使用者" name="username" value="" type="text" placeholder="example_123" />
                <FormInput label="密碼" name="username" value="" type="text" placeholder="example_123" />
                <button className="w-full py-1 bg-yellow-500 hover:bg-yellow-700 rounded-lg text-white font-bold cursor-pointer transition-all">登入</button>
            </form>

            <div className="fixed left-0 bottom-0 w-full h-[20%] bg-yellow-400">

            </div>
        </div>
    )
}

export default Login