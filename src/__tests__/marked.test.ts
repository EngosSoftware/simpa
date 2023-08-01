/**
 * @jest-environment jsdom
 */

/* MIT License
 *
 * Copyright (c) 2016-2023 Dariusz Depta
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {$md} from '../utils';

test('markedParagraph()', () => {
    let markdown = $md("alfa");
    expect(markdown).toMatch("<p>alfa</p>");
});

test('markedHeader()', () => {
    let markdown = $md("# simpa");
    expect(markdown).toMatch("<h1>simpa</h1>");
});
