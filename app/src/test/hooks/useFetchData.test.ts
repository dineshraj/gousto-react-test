import { waitFor, renderHook } from "@testing-library/react";
import useFetchData from "../../hooks/useFetchData";

describe('useFetchData', () => {
  it('calls fetch with the right URL', async () => {
    const url = 'test';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => jest.fn().mockResolvedValue({ data: []})
    } as unknown as Response);

    renderHook(() => useFetchData(url))

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith(url);
    });
  })
})