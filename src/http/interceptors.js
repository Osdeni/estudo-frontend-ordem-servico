import store from "../store";

export default req => {
    return ({ status }) => {
        if (status === 401) {
            store.dispatch('auth/ActionSignOut');
            window._Vue.$router.push({ name: 'login' });
        } else if (status === 403) {
            window._Vue.$toast.open({
                position: "top",
                message: "Você não possui permissão para realizar esta operação",
                type: "error"
              });
            window._Vue.$router.go(-1);
        }
    }
};