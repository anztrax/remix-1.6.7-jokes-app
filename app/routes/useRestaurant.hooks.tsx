import Form from "antd/lib/form";

const useRestaurantHooks = () => {
  const [searchForm] = Form.useForm();

  const onSearch = (formValues: any) => {
    console.log('handle on search : ', formValues);
  }

  const onClickRestaurantDetail = (restaurantId: string) => {
    const pathName = window.location.pathname;
    const finalUrl = `${pathName}/${restaurantId}`;
    window.location.href = finalUrl;
  }

  return {
    searchForm,
    onSearch,
    onClickRestaurantDetail
  }
}

export default useRestaurantHooks;
