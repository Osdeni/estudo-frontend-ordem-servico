import store from "../store";

export default req => {
    return ({ status, data }) => {
        if (status === 401) {
            store.dispatch('auth/ActionSignOut');
            window._Vue.$router.push({ name: 'login' });
        } else if (status === 403) {
            try {
                window._Vue.$toast.open({
                    position: "top",
                    message: data.message,
                    type: "error"
                }); 
            } catch (e) {
                console.log(e);                
                window._Vue.$toast.open({
                    position: "top",
                    message: "Você não possui permissão para realizar esta operação",
                    type: "error"
                });
            }
        }
    }
};